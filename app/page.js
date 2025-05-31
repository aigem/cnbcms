import IssueList from '@/components/IssueList'; // 使用Next.js的@别名导入组件

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">仓库Issue列表</h1>
        <IssueList />
      </div>
    </main>
  );
}