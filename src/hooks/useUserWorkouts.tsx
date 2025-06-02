
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
    if (!user) return;

    try {
      console.log('Criando treinos de exemplo para o usuário:', user.id);
      
      // Criar treinos de exemplo
      const sampleWorkouts = [
        {
          user_id: user.id,
          name: 'Treino de Peito e Tríceps',
          description: 'Treino focado no desenvolvimento do peitoral e tríceps',
          estimated_duration: 45,
          difficulty_level: 'intermediate',
          workout_type: 'Força',
          scheduled_date: new Date().toISOString(),
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
          name: 'Treino Completo',
          description: 'Treino funcional para corpo todo',
          estimated_duration: 40,
          difficulty_level: 'beginner',
          workout_type: 'Funcional',
          scheduled_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }
      ];

      const { data: createdWorkouts, error } = await supabase
        .from('user_workouts')
        .insert(sampleWorkouts)
        .select();

      console.log('Treinos criados:', createdWorkouts);
      console.log('Erro na criação:', error);

      if (error) throw error;

      // Buscar exercícios existentes para adicionar aos treinos
      const { data: exercises } = await supabase
        .from('exercises')
        .select('*')
        .limit(12);

      if (exercises && createdWorkouts) {
        console.log('Exercícios encontrados:', exercises.length);
        
        // Adicionar exercícios aos treinos criados
        const workoutExercises = [];
        
        // Primeiro treino - 4 exercícios
        for (let i = 0; i < Math.min(4, exercises.length); i++) {
          workoutExercises.push({
            workout_id: createdWorkouts[0].id,
            exercise_id: exercises[i].id,
            sets: 3,
            reps: '8-12',
            order_position: i + 1,
            rest_seconds: 60
          });
        }
        
        // Segundo treino - 4 exercícios
        for (let i = 4; i < Math.min(8, exercises.length); i++) {
          workoutExercises.push({
            workout_id: createdWorkouts[1].id,
            exercise_id: exercises[i].id,
            sets: 3,
            reps: '10-15',
            order_position: i - 3,
            rest_seconds: 60
          });
        }

        // Terceiro treino - 4 exercícios
        for (let i = 8; i < Math.min(12, exercises.length); i++) {
          workoutExercises.push({
            workout_id: createdWorkouts[2].id,
            exercise_id: exercises[i].id,
            sets: 4,
            reps: '12-15',
            order_position: i - 7,
            rest_seconds: 90
          });
        }

        console.log('Inserindo exercícios nos treinos:', workoutExercises.length);

        const { error: exerciseError } = await supabase
          .from('workout_exercises')
          .insert(workoutExercises);

        if (exerciseError) {
          console.error('Erro ao inserir exercícios:', exerciseError);
        } else {
          console.log('Exercícios inseridos com sucesso');
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
      console.log('Erro na busca:', workoutsError);

      if (workoutsError) throw workoutsError;

      // Se não tem treinos, criar alguns de exemplo
      if (!workoutsData || workoutsData.length === 0) {
        console.log('Nenhum treino encontrado, criando exemplos...');
        const created = await createSampleWorkouts();
        if (created) {
          // Buscar novamente após criar
          const { data: newWorkoutsData } = await supabase
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
          
          if (newWorkoutsData) {
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

            // Encontrar próximo treino não completado
            const upcoming = formattedWorkouts.find(w => !w.completed);
            setNextWorkout(upcoming || null);

            // Calcular estatísticas
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

        // Encontrar próximo treino não completado
        const upcoming = formattedWorkouts.find(w => !w.completed);
        setNextWorkout(upcoming || null);

        // Calcular estatísticas
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
