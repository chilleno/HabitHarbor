import supabase from '../utils/supabase';

export const savePomodoro = async (pomodoro: any, user: any): Promise<Boolean> => {
    const { data, error, status } = await supabase
        .from('config')
        .upsert({ pomodoro: pomodoro, user_id: user.id, updated_at: new Date() })
        .select()
        .single()
    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

export const loadPomodoro = async (user: any): Promise<any> => {
    const { data, error, status } = await supabase
        .from('config')
        .select()
        .eq('user_id', user.id)
        .single()
    if (status === 200) {
        return { status: 200, data: data.pomodoro };
    } else {
        console.log(error);
        return { status: 420};
    }
}

export const saveTaskLists = async (taskList: any, user: any): Promise<Boolean> => {
    const { data, error, status } = await supabase
        .from('task_lists')
        .upsert({ lists: taskList, user_id: user.id, updated_at: new Date() })
        .select()
        .single()
    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

export const loadTaskLists = async (user: any): Promise<any> => {
    const { data, error, status } = await supabase
        .from('task_lists')
        .select()
        .eq('user_id', user.id)
        .single()
    if (status === 200) {
        return { status: 200, data: data.lists };
    } else {
        console.log(error);
        return { status: 420};
    }
}

export const saveHabits = async (habits: any, user: any): Promise<Boolean> => {
    const { data, error, status } = await supabase
        .from('habits')
        .upsert({ trackers: habits, user_id: user.id, updated_at: new Date() })
        .select()
        .single()
    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

export const loadHabits = async (user: any): Promise<any> => {
    const { data, error, status } = await supabase
        .from('habits')
        .select()
        .eq('user_id', user.id)
        .single()
    if (status === 200) {
        return { status: 200, data: data.trackers };
    } else {
        console.log(error);
        return { status: 420};
    }
}
