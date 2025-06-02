
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Exercise {
  id: string;
  name: string;
  description: string | null;
  muscle_groups: string[] | null;
  equipment: string[] | null;
  difficulty_level: string | null;
  sets?: number | null;
  reps?: string | null;
  weight_kg?: number | null;
  rest_seconds?: number | null;
  order_position?: number;
}

interface Workout {
  id: string;
  name: string;
  description: string | null;
  estimated_duration: number | null;
  difficulty_level: string | null;
  workout_type: string | null;
  scheduled_date: string | null;
  completed: boolean | null;
  completed_at: string | null;
  exercises?: Exercise[];
}

export const useUserWorkouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [nextWorkout, setNextWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    completedWorkouts: 0,
    goalsAchieved: 0,
    currentStreak: 5,
    weeklyProgress: 85
  });

  const createSampleWorkouts = async () => {
    if (!user) return false;

    try {
      console.log('Criando treinos de exemplo para o usuário:', user.id);
      
      // Criar exercícios básicos primeiro se não existirem
      const { data: existingExercises } = await supabase
        .from('exercises')
        .select('*')
        .limit(1);

      if (!existingExercises || existingExercises.length === 0) {
        console.log('Criando exercícios básicos...');
        const basicExercises = [
          {
            name: 'Flexão de Braço',
            description: 'Exercício básico para peitoral',
            muscle_groups: ['peitoral', 'tríceps'],
            equipment: ['peso corporal'],
            difficulty_level: 'beginner'
          },
          {
            name: 'Agachamento',
            description: 'Exercício para pernas',
            muscle_groups: ['quadríceps', 'glúteos'],
            equipment: ['peso corporal'],
            difficulty_level: 'beginner'
          },
          {
            name: 'Prancha',
            description: 'Exercício para core',
            muscle_groups: ['abdômen'],
            equipment: ['peso corporal'],
            difficulty_level: 'beginner'
          },
          {
            name: 'Burpee',
            description: 'Exercício funcional completo',
            muscle_groups: ['corpo todo'],
            equipment: ['peso corporal'],
            difficulty_level: 'intermediate'
          }
        ];

        await supabase.from('exercises').insert(basicExercises);
      }

      // Buscar exercícios para usar nos treinos
      const { data: exercises } = await supabase
        .from('exercises')
        .select('*')
        .limit(8);

      // Criar treinos de exemplo
      const today = new Date();
      const sampleWorkouts = [
        {
          user_id: user.id,
          name: 'Treino de Peito e Tríceps',
          description: 'Treino focado no desenvolvimento do peitoral e tríceps',
          estimated_duration: 45,
          difficulty_level: 'intermediate',
          workout_type: 'Força',
          scheduled_date: today.toISOString(),
          completed: false
        },
        {
          user_id: user.id,
          name: 'Treino de Costas e Bíceps',
          description: 'Treino para fortalecer as costas e bíceps',
          estimated_duration: 50,
          difficulty_level: 'intermediate',
          workout_type: 'Força',
          scheduled_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        },
        {
          user_id: user.id,
          name: 'Treino de Pernas',
          description: 'Treino completo para membros inferiores',
          estimated_duration: 60,
          difficulty_level: 'intermediate',
          workout_type: 'Força',
          scheduled_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        },
        {
          user_id: user.id,
          name: 'Treino Funcional',
          description: 'Treino funcional para corpo todo',
          estimated_duration: 40,
          difficulty_level: 'beginner',
          workout_type: 'Funcional',
          scheduled_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }
      ];

      const { data: createdWorkouts, error: workoutError } = await supabase
        .from('user_workouts')
        .insert(sampleWorkouts)
        .select();

      if (workoutError) {
        console.error('Erro ao criar treinos:', workoutError);
        return false;
      }

      console.log('Treinos criados:', createdWorkouts?.length);

      // Adicionar exercícios aos treinos se temos exercícios disponíveis
      if (exercises && exercises.length > 0 && createdWorkouts) {
        const workoutExercises = [];
        
        createdWorkouts.forEach((workout, workoutIndex) => {
          // Adicionar 3-4 exercícios por treino
          const exercisesPerWorkout = 3;
          for (let i = 0; i < exercisesPerWorkout && i < exercises.length; i++) {
            const exerciseIndex = (workoutIndex * exercisesPerWorkout + i) % exercises.length;
            workoutExercises.push({
              workout_id: workout.id,
              exercise_id: exercises[exerciseIndex].id,
              sets: 3,
              reps: '8-12',
              order_position: i + 1,
              rest_seconds: 60
            });
          }
        });

        if (workoutExercises.length > 0) {
          const { error: exerciseError } = await supabase
            .from('workout_exercises')
            .insert(workoutExercises);

          if (exerciseError) {
            console.error('Erro ao inserir exercícios nos treinos:', exerciseError);
          } else {
            console.log('Exercícios inseridos nos treinos com sucesso');
          }
        }
      }

      return true;
    } catch (error) {
      console.error('Erro ao criar treinos de exemplo:', error);
      return false;
    }
  };

  const fetchWorkouts = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      console.log('Buscando treinos para o usuário:', user.id);

      // Buscar treinos do usuário
      const { data: workoutsData, error: workoutsError } = await supabase
        .from('user_workouts')
        .select(`
          *,
          workout_exercises (
            *,
            exercises (*)
          )
        `)
        .eq('user_id', user.id)
        .order('scheduled_date', { ascending: true });

      console.log('Treinos encontrados:', workoutsData?.length || 0);

      if (workoutsError) {
        console.error('Erro na busca de treinos:', workoutsError);
        throw workoutsError;
      }

      // Se não tem treinos, criar alguns de exemplo
      if (!workoutsData || workoutsData.length === 0) {
        console.log('Nenhum treino encontrado, criando exemplos...');
        const created = await createSampleWorkouts();
        
        if (created) {
          // Buscar novamente após criar
          const { data: newWorkoutsData, error: newError } = await supabase
            .from('user_workouts')
            .select(`
              *,
              workout_exercises (
                *,
                exercises (*)
              )
            `)
            .eq('user_id', user.id)
            .order('scheduled_date', { ascending: true });
          
          if (newError) {
            console.error('Erro ao buscar treinos após criação:', newError);
          } else if (newWorkoutsData) {
            const formattedWorkouts = newWorkoutsData.map(workout => ({
              ...workout,
              exercises: workout.workout_exercises?.map(we => ({
                ...we.exercises,
                sets: we.sets,
                reps: we.reps,
                weight_kg: we.weight_kg,
                rest_seconds: we.rest_seconds,
                order_position: we.order_position
              }))
            }));

            setWorkouts(formattedWorkouts);
            const upcoming = formattedWorkouts.find(w => !w.completed);
            setNextWorkout(upcoming || null);

            const completed = formattedWorkouts.filter(w => w.completed).length;
            setStats(prev => ({
              ...prev,
              completedWorkouts: completed,
              goalsAchieved: Math.floor(completed * 0.67)
            }));
          }
        }
      } else {
        const formattedWorkouts = workoutsData.map(workout => ({
          ...workout,
          exercises: workout.workout_exercises?.map(we => ({
            ...we.exercises,
            sets: we.sets,
            reps: we.reps,
            weight_kg: we.weight_kg,
            rest_seconds: we.rest_seconds,
            order_position: we.order_position
          }))
        }));

        setWorkouts(formattedWorkouts);
        const upcoming = formattedWorkouts.find(w => !w.completed);
        setNextWorkout(upcoming || null);

        const completed = formattedWorkouts.filter(w => w.completed).length;
        setStats(prev => ({
          ...prev,
          completedWorkouts: completed,
          goalsAchieved: Math.floor(completed * 0.67)
        }));
      }

    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  return { 
    workouts, 
    nextWorkout, 
    loading, 
    stats, 
    refetchWorkouts: fetchWorkouts 
  };
};
