export default function Branding() {
    return (
        <div className="flex items-center h-16 w-full mb-12">
        <div className='absolute top-8 left-6'>
          <img
            className="h-10 w-auto object-contain"
            src="./BargainHunt-Icon4x.png"
            alt="BargainHunt Icon"
          />
        </div>
        <div className='flex justify-center w-full'>
          <img
            src="./BargainHunt.png"
            alt="BargainHunt"
            className="h-10 mt-5 w-auto object-contain"
          />
        </div>
      </div>
    )
}
