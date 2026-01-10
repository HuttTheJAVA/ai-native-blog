interface Author {
  name: string
  bio: string
  avatarUrl: string
}

interface AuthorProfileProps {
  author: Author
}

export default function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-700">
      <div className="flex items-center gap-4">
        <img
          src={author.avatarUrl}
          alt={`${author.name}'s avatar`}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
            {author.name}
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  )
}
