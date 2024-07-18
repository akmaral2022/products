export interface Products {
  id: number,
  name: string,
  quantity: number,
  price: string,
  photoUrl: string,
  manufacturerId: number,
}

export interface ProductModalProps {
  product: Products | null,
  onClose: () => void,
  onDelete?: (id: number) => void,
}

export interface DisplayTypes {
  products: Products[],
  onShowMore: (id: number) => void,
}