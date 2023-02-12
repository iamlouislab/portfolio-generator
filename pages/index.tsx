import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const App = () => {
  const supabaseClient = createBrowserSupabaseClient();

  return (
    <section className="min-h-[600px] text-center bg-gray-400">
      <p> Desgin beautiful portfolios in seconds</p>
    </section>
  );
};

export default App;
