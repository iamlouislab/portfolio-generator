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
      router.replace("/account");
    }
  }, [user]);

  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log("event: ", event);
    console.log("session: ", session);
  });

  if (!user)
    return (
      <div className="w-1/3 m-auto bg-white rounded mt-6">
        <div className="flex justify-center height-screen-helper">
          <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
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
