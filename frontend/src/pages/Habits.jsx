import { useEffect, useState } from "react";

import api from "../services/api";

import HabitCard from "../components/HabitCard";
import HabitForm from "../components/HabitForm";

export default function Habits(){

    const [habits,setHabits]=useState([]);

    const [editingHabit,setEditingHabit]=useState(null);

    useEffect(()=>{

        loadHabits();

    },[]);

    async function loadHabits(){

        const response=await api.get("/habits/");

        setHabits(response.data);

    }

    async function saveHabit(data){

        if(editingHabit){

            await api.put(

                `/habits/${editingHabit.id}`,

                data

            );

            setEditingHabit(null);

        }

        else{

            await api.post(

                "/habits/",

                data

            );

        }

        loadHabits();

    }

    async function deleteHabit(id){

        await api.delete(`/habits/${id}`);

        loadHabits();

    }

    async function completeHabit(id){

        await api.post("/logs/",{

            habit_id:id,

            status:"completed"

        });

        alert("Habit Completed");

    }

    return(

        <div>

            <HabitForm

                onSubmit={saveHabit}

                editingHabit={editingHabit}

            />

            <div className="grid lg:grid-cols-2 gap-6">

                {

                    habits.map(habit=>(

                        <HabitCard

                            key={habit.id}

                            habit={habit}

                            onEdit={setEditingHabit}

                            onDelete={deleteHabit}

                            onComplete={completeHabit}

                        />

                    ))

                }

            </div>

        </div>

    );

}