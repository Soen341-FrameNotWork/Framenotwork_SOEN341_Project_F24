import RatingForm from "../components/StudentRatingForm";

const teammates = ["John Doe", "Jane Smith", "Michael Johnson", "Sarah Lee"]; // sample array of teammates

export default function Home() {
    return (
        <RatingForm teammates={teammates}/>
    );
}