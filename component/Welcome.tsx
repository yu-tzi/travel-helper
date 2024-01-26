import type { Liff } from "@line/liff";

const Welcome = ({ liff }: { liff: Liff | null }) => {
  return (
    <>
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
    </>
  );
};

export default Welcome;
