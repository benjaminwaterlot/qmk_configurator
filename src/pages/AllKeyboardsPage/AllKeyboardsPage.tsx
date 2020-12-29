import { FC } from 'react'

interface AllKeyboardsPageProps {
  keyboards: string[]
}

const AllKeyboardsPage: FC<AllKeyboardsPageProps> = ({ keyboards }) => {
  return (
    <div>
      {keyboards.map((keyboard) => (
        <p>{keyboard}</p>
      ))}
    </div>
  )
}

export default AllKeyboardsPage
