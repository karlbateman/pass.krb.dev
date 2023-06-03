import { get } from "lodash";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface AuthProps {
  appID: string;
}

export const getStaticProps: GetStaticProps<AuthProps> = () => {
  return {
    props: {
      appID: get(process, "env.PASSAGE_APP_ID", ""),
    },
  };
};

export const Auth: NextPage<AuthProps> = ({ appID }) => {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  return (
    <>
      <Head>
        <title>Passage Authentication | pass.krb.dev</title>
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
            <passage-auth app-id={appID}></passage-auth>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
