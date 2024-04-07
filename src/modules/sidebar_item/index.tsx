import Image from "next/image"
import Link from "next/link"

const SidebarItem = ({label,src, link, alt}: {label:string ,src: string, link: string, alt: string}) => {
    return(
        <li>
            <Link href={link?link:"#"} className="sidebar--item">
            <Image
                className="sidebar--item__icon"
                src={src}
                alt={alt}
                height={45}
                width={45}
            />
            <p>{label}</p>
            </Link>
        </li>
    )
} 
export default SidebarItem;