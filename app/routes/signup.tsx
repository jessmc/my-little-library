import { Form, useActionData, redirect } from "react-router";
import type { ClientActionFunctionArgs } from "react-router";
import { supabase } from "~/supabaseClient";

export async function clientAction({ request }: ClientActionFunctionArgs) {
    const formData = await request.formData();
    const displayName = formData.get("displayName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { display_name: displayName },
        },
    });

    if (error) {
        return { error: error.message };
    }

    return redirect("/library");
}

export default function SignUp() {
    const data = useActionData() as { error?: string };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background color-parchment">
            <Form method="post" className="bg-burgundy p-6 rounded-xl shadow-cozy">
                <h1 className="text-xl font-bold mb-4 font-merriweather">Sign Up</h1>
                <label className="text-xl font-bold mb-4 font-merriweather" htmlFor="displayName">First Name</label>
                <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    className="w-full p-2 mb-3 rounded bg-parchment text-burgundy"
                    required
                />
                <label className="text-xl font-bold mb-4 font-merriweather" htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full p-2 mb-3 rounded bg-parchment text-burgundy"
                    required
                />
                <label className="text-xl font-bold mb-4 font-merriweather" htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full p-2 mb-3 rounded bg-parchment text-burgundy"
                    required
                />
                {data?.error && <p className="text-pumpkin">{data.error}</p>}
                <button
                    type="submit"
                    className="font-librew-full bg-sage text-forest font-bold py-2 rounded hover:bg-forest hover:text-sage"
                >
                    Sign Up
                </button>
            </Form>
        </div>
    );
}
