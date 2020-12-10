import Head from 'next/head'
import { BasicLayout } from "../layouts/BasicLayout";

export default function Home() {
	return (
		<BasicLayout>
			<Head>
				<title>Gaming - Home</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="home">
				<h1>Next js</h1>

			</div>
		</BasicLayout>
	);
}
