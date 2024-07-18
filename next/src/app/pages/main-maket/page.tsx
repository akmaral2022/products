import { ContentProps } from "@/types/main-layout-types"
import { FC } from "react"
import Sidebar from "../../../components/layouts/sidebar"
import ProductsPage from "../products/page"

const MainLayout: React.FC<ContentProps> = () => {
  return (
    <div className="flex w-full bg-[#E2E8F0]">
      <Sidebar />
      <main className="w-[1024px] mx-auto mt-0">
        <ProductsPage />
      </main>
    </div>
  )
}

export default MainLayout