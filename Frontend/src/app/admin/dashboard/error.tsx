"use client";


export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] text-gray-100">
      <div className="max-w-md p-8 bg-[#111827] rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#052D69] hover:bg-[#025aa5] text-white rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
