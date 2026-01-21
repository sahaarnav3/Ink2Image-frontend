import { redirect } from "next/navigation";

export default function Home() {
  // return (
  //   <h1>hello bookture</h1>
  // );
  redirect('/dashboard')
}
