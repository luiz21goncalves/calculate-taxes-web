import { api } from '@/data/api'
import { priceFormatter } from '@/utils'

type NoteDetailsPageProps = {
  params: {
    fileId: string
  }
}

type Company = {
  document: string
  name: string
}

type Product = {
  id: string
  name: string
  quantity: number
  unit: string
  unit_price: number
  total_price: number
  taxes: {
    icms_st: number
    ipi: number
  }
  other: number
  discount: number
  shipping: number
}

type Note = {
  number: number
  seller: Company
  customer: Company
  products: Product[]
  total: {
    products: number
    others: number
    icms_st: number
    shipping: number
    ipi: number
    discount: number
    safe: number
    nf: number
  }
}

export type FormattedProduct = {
  id: string
  name: string
  quantity: number
  unit: string
  unitPrice: string
  totalPrice: string
}

export default async function NoteDetailsPage(props: NoteDetailsPageProps) {
  const {
    params: { fileId },
  } = props

  const response = await api(`/calculate/${fileId}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const note = (await response.json()) as Note
  const formattedProducts = note.products.reduce((acc, product) => {
    const {
      quantity,
      total_price: total,
      discount,
      other,
      taxes,
      id,
      name,
      shipping,
      unit,
    } = product

    const totalPrice =
      total + other + taxes.ipi + taxes.icms_st + shipping - discount

    acc.push({
      id,
      name,
      unit,
      quantity,
      totalPrice: priceFormatter(totalPrice),
      unitPrice: priceFormatter(totalPrice / (quantity / 100)),
    })

    return acc
  }, [] as FormattedProduct[])

  return (
    <div>
      <div className="grid grid-cols-3 divide-x divide-zinc-600 border border-zinc-600">
        <div className="grid grid-cols-1 items-center justify-center gap-1 p-4">
          <p className="font-semibold">Nfe: {note.number}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-1 p-4">
          <p className="truncate text-sm font-semibold">{note.customer.name}</p>
          <p className="text-sm">CNPJ/CPF: {note.customer.document}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-1 p-4">
          <p className="truncate text-sm font-semibold">{note.seller.name}</p>
          <p className="text-sm">CNPJ/CPF: {note.seller.document}</p>
        </div>
      </div>
      <table className="w-full table-auto border-collapse border border-zinc-600">
        <thead className="bg-blue-950 text-sm uppercase text-zinc-200">
          <tr className="divide-x divide-blue-100">
            <th scope="col" className="px-4 py-2">
              Código
            </th>
            <th scope="col" className="px-4 py-2">
              Nome
            </th>
            <th scope="col" className="px-4 py-2">
              Unidade
            </th>
            <th scope="col" className="px-4 py-2">
              Quantidade
            </th>
            <th scope="col" className="px-4 py-2">
              Preço unitário
            </th>
            <th scope="col" className="px-4 py-2">
              Preço total
            </th>
          </tr>
        </thead>

        <tbody>
          {formattedProducts.map((product) => {
            return (
              <tr
                key={product.id}
                className="divide-x divide-zinc-600 even:bg-slate-300"
              >
                <td className="p-2 text-center font-semibold">{product.id}</td>
                <td className="p-2 text-center">{product.name}</td>
                <td className="p-2 text-center">{product.unit}</td>
                <td className="p-2 text-center">{product.quantity / 100}</td>
                <td className="p-2 text-center">{product.unitPrice}</td>
                <td className="p-2 text-center font-semibold">
                  {product.totalPrice}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="grid grid-cols-4 gap-4 divide-zinc-600 border border-t-0 border-zinc-600 p-2">
        <span className="px-2 font-semibold">
          Total NF-e: {priceFormatter(note.total.nf)}
        </span>
        <span className="px-2">
          Valor dos produtos: {priceFormatter(note.total.products)}
        </span>
        <span className="px-2">
          ICMS ST: {priceFormatter(note.total.icms_st)}
        </span>
        <span className="px-2">IPI: {priceFormatter(note.total.ipi)}</span>
        <span className="px-2">Seguro: {priceFormatter(note.total.safe)}</span>
        <span className="px-2">
          Frete: {priceFormatter(note.total.shipping)}
        </span>
        <span className="px-2">
          Desconto: {priceFormatter(note.total.discount)}
        </span>
        <span className="px-2">
          Outras despesas: {priceFormatter(note.total.others)}
        </span>
      </div>
    </div>
  )
}
