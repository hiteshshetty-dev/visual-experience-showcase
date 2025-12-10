import Link from "next/link";
import { activities } from "./data";

export default function ActivitiesListing() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resort Activities</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{activity.name}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {activity.description}
            </p>
            <Link
              href={`/lytics/activities/${activity.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
