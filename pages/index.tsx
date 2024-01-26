import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import Welcome from "../component/welcome";

const Home: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
  return (
    <div>
      <Head>
        <title>Travel helper - planner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {liff?.isLoggedIn() && !liffError ? (
          <button
            className="bg-gray-400 hover:bg-gray-200 text-white font-sm py-2 px-4 rounded w-40 m-auto"
            onClick={async () => {
              const accessToken = liff?.isLoggedIn() && liff?.getIDToken();
              // 把 token 傳給後端以確認使用者認證
            }}
          >
            call get tours api
          </button>
        ) : (
          <Welcome liff={liff} />
        )}
      </main>
    </div>
  );
};

export default Home;
