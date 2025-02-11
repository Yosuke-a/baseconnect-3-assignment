"use client";
import Link from 'next/link';


export const Header = () => {

  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h2>求人検索アプリ</h2>
      <div className="flex gap-4">
        <button onClick={() => alert("求人検索ボタンがクリックされました")}>
          求人検索
        </button>
        <Link href="/post">求人投稿</Link>
      </div>
    </header>
  );
};
