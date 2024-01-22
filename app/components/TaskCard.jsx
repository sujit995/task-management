import Link from "next/link";


export default function TaskCard({ props }) {
  return (
      <div className="bg-light">
        <div className="card mt-3 shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold">{props.title}</h5>
            <p>{props.description}</p>
            <Link href={"/tasks/" + props.key} className="text-decoration-none">
                <button type="submit" className="btn btn-success">
                    Edit
                </button>
            </Link>
          </div>
        </div>
      </div>
  );
}
