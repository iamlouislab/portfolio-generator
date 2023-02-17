import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const location = useRouter();

  useEffect(() => {
    AOS.init({
      once: false,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  useEffect(() => {
    // @ts-ignore
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    // @ts-ignore
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className="min-h-screen">
        <Navbar />
        <div className="mt-0 h-screen">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionContextProvider>
  );
}

export default MyApp;
