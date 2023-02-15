import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const SignIn = () => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (user) {
      console.log("user: ", user);
      router.replace("/profile");
    }
  }, [user]);

  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log("event: ", event);
    console.log("session: ", session);
  });

  if (!user)
    return (
      <div className="m-auto mt-6 w-1/3 rounded bg-white">
        <div className="height-screen-helper flex justify-center">
          <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3 ">
            <div className="flex flex-col space-y-4">
              <Auth
                supabaseClient={supabaseClient}
                providers={["github", "google", "twitter"]}
                redirectTo="/account"
                magicLink={true}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#404040",
                        brandAccent: "#52525b",
                      },
                    },
                  },
                }}
                theme="dark"
              />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="m-6">
      <h1>Loading</h1>
    </div>
  );
};

export default SignIn;
