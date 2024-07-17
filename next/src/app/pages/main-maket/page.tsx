import { ContentProps } from "@/types/main-layout-types"
import { FC } from "react"
import Sidebar from "../../../components/layouts/sidebar"
import ProductsTable from "../product-table/page"

const MainLayout: React.FC<ContentProps> = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="w-[1024px] mx-auto mt-0">
        <ProductsTable />
      </main>
    </div>
  )
}

export default MainLayout