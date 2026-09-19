import { DotMatrixIcon } from "../components/decoratives/dot-matrix"

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <DotMatrixIcon iconIndex={0} size={56} />
    </div>
  )
}

export default Loading