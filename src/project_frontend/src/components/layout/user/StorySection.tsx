import { Link } from "react-router-dom";
import { Story } from "../../../types";
import { StoryLink } from "../../ui";

interface StorySectionProps {
  title: string;
  stories: Story[];
  emptyMessage: string;
}

export function StorySection({
  title,
  stories,
  emptyMessage,
}: StorySectionProps) {
  return (
    <section>
      <SectionHeader title={title} count={stories.length} />
      {stories.length === 0 ? (
        <EmptyMessage message={emptyMessage} />
      ) : (
        <StoryList stories={stories} />
      )}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  count: number;
}

function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <h2 className="text-lg font-semibold text-base-content mb-3 pb-2 border-b border-base-300">
      {title} ({count})
    </h2>
  );
}

interface EmptyMessageProps {
  message: string;
}

function EmptyMessage({ message }: EmptyMessageProps) {
  return <p className="text-base-content/60 text-sm py-4">{message}</p>;
}

interface StoryListProps {
  stories: Story[];
}

function StoryList({ stories }: StoryListProps) {
  return (
    <div className="flex flex-col gap-4">
      {stories.map((story) => (
        <Link key={story.id} to={`/story/${story.id}`}>
          <StoryLink story={story} />
        </Link>
      ))}
    </div>
  );
}
