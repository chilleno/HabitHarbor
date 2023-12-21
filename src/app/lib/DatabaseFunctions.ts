import supabase from '../utils/supabase';

export const savePomodoro = async (pomodoro: any, user: any): Promise<Boolean> => {
    const { data, error, status } = await supabase
        .from('config')
        .upsert({ pomodoro: pomodoro, user_id: user.id, updated_at: new Date() })
        .select()
    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

export const saveTaskLists = async (taskList: any, user: any): Promise<Boolean> => {
    const { data, error, status } = await supabase
        .from('task_lists')
        .upsert({ lists: taskList, user_id: user.id, updated_at: new Date() })
        .select()
    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

export const saveHabits = async (habits: any, user: any): Promise<Boolean> => {
    const { data, error, status } = await supabase
        .from('habits')
        .upsert({ trackers: habits, user_id: user.id, updated_at: new Date() })
        .select()
    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

