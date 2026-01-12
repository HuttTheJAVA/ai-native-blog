'use client'

import { useState, useEffect } from 'react'

interface LikeButtonProps {
  slug: string
}

export default function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0)
  const [hasLiked, setHasLiked] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
    setHasLiked(!!likedPosts[slug])

    fetchLikes()
  }, [slug])

  const fetchLikes = async () => {
    try {
      const response = await fetch(`/api/likes/${slug}`)
      const data = await response.json()
      setLikes(data.likes)
    } catch (error) {
      console.error('Failed to fetch likes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async () => {
    if (hasLiked) return

    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
      })
      const data = await response.json()
      setLikes(data.likes)
      setHasLiked(true)

      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
      likedPosts[slug] = true
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
    } catch (error) {
      console.error('Failed to like post:', error)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        hasLiked
          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
          : 'bg-neutral-100 text-neutral-600 hover:bg-red-50 hover:text-red-500 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-900/20 dark:hover:text-red-400'
      } disabled:cursor-not-allowed`}
      aria-label={hasLiked ? 'Already liked' : 'Like this post'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={hasLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span>{isLoading ? '...' : likes}</span>
    </button>
  )
}
