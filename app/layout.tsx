// import { GeistSans } from "geist/font/sans";
import { DM_Sans } from 'next/font/google'
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import Container from "@/components/Container";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

  const DMSans = DM_Sans({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <html lang="en" className={`${DMSans.className}`}>
      <body className="bg-background text-foreground">
        <main className="">
          {/* IF USER IS LOGGED IN, DISPLAY SIDEBAR WITH CUSTOM CONTAINER;
              IF NOT LOGGED IN, DISPLAY COMPONENTS AS NORMAL */}
          {user ? (
            <div className="md:flex">
              <aside
                className="md:bg-transparent md:text-darkText bg-darkText md:rounded-none rounded-3xl text-foreground md:p-6 md:h-screen md:w-[23vw] md:m-0 md:left-0 md:top-0 md:translate-x-0 md:sticky md:block md:flex-[1]
                w-[90%] h-[80px] fixed bottom-0 left-1/2 transform translate-x-[-50%] mb-5 flex flex-row justify-center items-center"
              >
                <SideBar />
              </aside>
              <Container>
                {children}
              </Container>
            </div>
          ) : (
            children
          )}
        </main>
      </body>
    </html>
  );
}
