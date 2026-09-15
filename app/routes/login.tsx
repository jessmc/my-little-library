import { Form, useActionData, redirect } from "react-router";
import type { ClientActionFunctionArgs } from "react-router";
import { supabase } from "~/supabaseClient";

export async function clientAction({request}: ClientActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    // Redirect to library page if success
    return redirect("/library");
}

export default function Login() {
    const data = useActionData() as { error?: string };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background color-parchment">
            <Form method="post" className="bg-burgundy p-6 rounded-xl shadow-cozy">
                <h1 className="text-xl font-bold mb-4 font-merriweather">Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 rounded bg-parchment text-burgundy"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3 rounded bg-parchment text-burgundy"
                />
                {data?.error && <p className="text-pumpkin">{data.error}</p>}
                <button
                type="submit"
                className="font-librew-full bg-sage text-forest font-bold py-2 rounded hover:bg-forest hover:text-sage"
                >Sign In
                </button>
            </Form>
        </div>
    )
}