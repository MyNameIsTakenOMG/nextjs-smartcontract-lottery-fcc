import Link from "next/link";

function HomePage() {
    return (
        <div>
            <div>Welcome to Next.js!</div>
            <Link href={'/signin'}><a>go to signin</a></Link>
        </div>
    );
}

export default HomePage;
