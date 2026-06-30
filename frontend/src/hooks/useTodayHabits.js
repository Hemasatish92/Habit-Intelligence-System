import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function todayString() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function todayString() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export default function useTodayHabits() {

    const [habits, setHabits] = useState([]);
    const [completedTodayIds, setCompletedTodayIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = useCallback(async () => {

        setLoading(true);
        setError("");

        try {

            const [habitsRes, logsRes] = await Promise.all([
                api.get("/habits/"),
                api.get("/logs/")
            ]);

            setHabits(habitsRes.data);

            const today = todayString();

            const ids = logsRes.data
                .filter(
                    log => String(log.date).slice(0, 10) === today
                )
                .map(
                    log => log.habit_id
                );

            setCompletedTodayIds(new Set(ids));

        }
        catch (err) {

            console.log(err);
            setError("Could not load your habits.");

        }
        finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        load();

    }, [load]);

    async function completeHabit(id) {

        try {

            // Undo today's completion
            if (completedTodayIds.has(id)) {

                await api.delete(`/logs/today/${id}`);

                await load();

                toast.success("Habit unchecked for today");

                return;

            }

            // Mark complete
            await api.post(
                "/logs/",
                {
                    habit_id: id,
                    status: "completed"
                }
            );

            await load();

            toast.success("Nice work — marked complete for today 🎉");

        }
        catch (err) {

            console.log(err);

            if (err.response?.status === 400) {

                toast.info("You've already marked this complete today");

            }
            else if (err.response?.status ===404) {

                toast.error("Today's log not found");

            }
            else {

                toast.error("Could not update today's habit");

            }

        }

    }

    return {

        habits,
        completedTodayIds,
        loading,
        error,
        reload: load,
        completeHabit

    };

}