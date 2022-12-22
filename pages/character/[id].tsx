import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import styles from "./Character.module.css";
import {
	GiAlienSkull,
	GiCloak,
	GiChewedSkull,
	GiDoubleDiaphragm,
	GiEmbryo,
	GiClick,
} from "react-icons/gi";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import { IoMdPlanet } from "react-icons/io";
import { FC, memo } from "react";
import BackToCharacters from "../../app/components/Buttons/BackToCharacters";

const Character: FC = memo(() => {
	const router = useRouter();
	const id = router.query.id;

	const { data, status } = useQuery({
		queryKey: ["character", { id }],
		queryFn: () =>
			axios
				.get(`https://rickandmortyapi.com/api/character/${id}`)
				.then((res) => res.data),
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
	});

	console.log(data);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{status === "loading" ?? <p className={styles.status}>Loading...</p>}
				{status === "error" ?? <p className={styles.status}>Error</p>}
				<div>
					{data && (
						<Image
							src={data.image}
							alt={data.name}
							width={325}
							height={325}
							className={styles.image}
						/>
					)}
				</div>
				<div>
					{data && (
						<ul className={styles.dataItems}>
							{/* Name */}
							<li className={styles.list}>
								<p className={styles.name}>{data.name}</p>
							</li>
							{/* Species */}
							<li className={styles.list}>
								{data.species === "Human" ? (
									<MdOutlineEmojiPeople className={styles.human} />
								) : (
									<GiAlienSkull className={styles.alien} />
								)}

								{data.species}
							</li>
							{/* Gender */}
							<li className={styles.list}>
								<BsGenderAmbiguous
									className={
										data.gender === "Male"
											? styles.male
											: data.gender === "Female"
											? styles.female
											: styles.unknownGender
									}
								/>
								{data.gender}
							</li>
							{/* Status */}
							<li className={styles.list}>
								{data.status === "Alive" ? (
									<GiDoubleDiaphragm className={styles.alive} />
								) : data.status === "Dead" ? (
									<GiChewedSkull className={styles.dead} />
								) : (
									<GiCloak className={styles.unknown} />
								)}
								{data.status}
							</li>
							{/* Location */}
							<li className={styles.list}>
								<Link
									href={`/location/${data.location.url.slice(41)}`}
									className={styles.list}
								>
									<IoMdPlanet className={styles.location} />
									{data.location.name}
									<GiClick className={styles.click} />
								</Link>
							</li>
							{/* Origin */}
							<li className={styles.list}>
								<GiEmbryo className={styles.origin} />
								{data.origin.name}
							</li>
						</ul>
					)}
				</div>
			</div>
			<BackToCharacters />
		</div>
	);
});

export default Character;
