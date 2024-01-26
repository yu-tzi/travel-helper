import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage<{
  liff: Liff | null;
  liffError: string | null;
}> = ({ liff, liffError }) => {
  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center p-5 gap-4">
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <div className="flex flex-col justify-center gap-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-sm py-2 px-4 rounded disabled:opacity-50"
            onClick={() => {
              if (!liff?.isLoggedIn()) {
                liff?.login();
              }
            }}
            disabled={liff?.isLoggedIn()}
          >
            {liff?.isLoggedIn() ? "Already LogIn" : "LINE login"}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-sm py-2 px-4 rounded"
            onClick={async () => {
              const accessToken = liff?.isLoggedIn() && liff?.getAccessToken();
              // 把 token 傳給後端以確認使用者認證
            }}
          >
            測試打 API
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
