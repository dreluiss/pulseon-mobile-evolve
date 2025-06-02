
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

  const fetchWorkouts = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
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

      if (workoutsError) throw workoutsError;

      const formattedWorkouts = workoutsData?.map(workout => ({
        ...workout,
        exercises: workout.workout_exercises?.map(we => ({
          ...we.exercises,
          sets: we.sets,
          reps: we.reps,
          weight_kg: we.weight_kg,
          rest_seconds: we.rest_seconds,
          order_position: we.order_position
        }))
      })) || [];

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

    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleWorkouts = async () => {
    if (!user) return;

    try {
      // Verificar se já tem treinos
      const { data: existing } = await supabase
        .from('user_workouts')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      if (existing && existing.length > 0) return;

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
        }
      ];

      const { data: createdWorkouts, error } = await supabase
        .from('user_workouts')
        .insert(sampleWorkouts)
        .select();

      if (error) throw error;

      // Adicionar exercícios aos treinos
      if (createdWorkouts) {
        const { data: exercises } = await supabase
          .from('exercises')
          .select('*')
          .limit(8);

        if (exercises) {
          // Adicionar exercícios ao primeiro treino
          const workoutExercises = exercises.slice(0, 4).map((exercise, index) => ({
            workout_id: createdWorkouts[0].id,
            exercise_id: exercise.id,
            sets: 3,
            reps: '8-12',
            order_position: index + 1
          }));

          await supabase
            .from('workout_exercises')
            .insert(workoutExercises);
        }
      }

      // Recarregar treinos
      fetchWorkouts();

    } catch (error) {
      console.error('Erro ao criar treinos de exemplo:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkouts();
      createSampleWorkouts();
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
