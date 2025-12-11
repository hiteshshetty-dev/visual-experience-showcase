import { activities } from "../data";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ActivityDetail({ params }: Props) {
  const { slug } = await params;
  const activity = activities.find((a) => a.id === slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/lytics/activities"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Activities
      </Link>
      <h1 className="text-4xl font-bold mb-4">{activity.name}</h1>
      {activity.subtitle && (
        <p className="text-lg text-gray-600 italic mb-6">{activity.subtitle}</p>
      )}
      <div className="prose max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
