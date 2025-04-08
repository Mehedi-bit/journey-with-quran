
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

// export default function ComingSoon() {
//   return (
//     <div className="flex flex-col min-h-[90dvh]">
//       <main className="flex-1">
//         <section className="w-full h-full flex items-center justify-center">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-6 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Coming Soon</h1>
//                 <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                   We're working hard to bring you an amazing new product. Sign up to be the first to know when we
//                   launch.
//                 </p>
//               </div>
//               <div className="w-full max-w-sm space-y-2">
//                 <form className="flex gap-2">
//                   <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
//                   <Button type="submit">Notify Me</Button>
//                 </form>
//                 <p className="text-xs text-muted-foreground">
//                   We'll never share your email. 
//                   {/* Read our{" "}
//                   <a href="#" className="underline underline-offset-2" >
//                     privacy policy
//                   </a>
//                   . */}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 justify-center items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-muted-foreground">&copy; 2025 Journey with Quran. All rights reserved.</p>
//       </footer>
//     </div>
//   )
// }


export default function ComingSoon() {
  return (
    <div className="flex flex-col min-h-[90dvh] justify-center items-center">
        <Link to="/">
            <Button variant="outline" className="mb-4">Coming Soon in sha Allah</Button>
        </Link>
    </div>
  )
}