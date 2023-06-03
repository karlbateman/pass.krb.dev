import Passage from "@passageidentity/passage-node";
import { get } from "lodash";
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type NextPage,
} from "next";
import Head from "next/head";
import { useEffect } from "react";

interface HomeProps {
  username: string;
  appID: string;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context: GetServerSidePropsContext
) => {
  const passage = new Passage({
    appID: get(process, "env.PASSAGE_APP_ID", ""),
    apiKey: get(process, "env.PASSAGE_API_KEY", ""),
    authStrategy: "HEADER",
  });
  const props = {
    appID: passage.appID,
    username: "",
  };
  try {
    const token = get(context, "req.cookies.psg_auth_token", "");
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const userID = await passage.authenticateRequest(req);
    if (!userID) return { redirect: { destination: "/auth" }, props };
    const { email, phone } = await passage.user.get(userID);
    props.username = email ? email : phone;
    return { props };
  } catch (err) {
    return { redirect: { destination: "/auth" }, props };
  }
};

const Home: NextPage<HomeProps> = ({ username, appID }) => {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
  }, []);
  return (
    <>
      <Head>
        <title>Welcome | pass.krb.dev</title>
        <meta
          name="description"
          content="Passwordless authentication demo using passage.id and NextJS."
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://www.krb.dev/favicons/favicon-32x32.png?v=3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://www.krb.dev/favicons/favicon-16x16.png?v=3"
        />
        <link
          rel="shortcut icon"
          href="https://www.krb.dev/favicons/favicon.ico?v=3"
        />
      </Head>
      <div className="flex h-screen flex-col">
        <div className="flex max-w-3xl flex-grow justify-center p-5 py-10 md:p-16">
          <div className="flex grow flex-col justify-center">
            <h1 className="text-3xl font-bold text-neutral-900">Welcome</h1>
            <p className="mt-4 border border-green-500 bg-green-50 p-5 text-green-800">
              Successfully authenticated as {username}
            </p>
            <passage-profile app-id={appID}></passage-profile>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
