import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { MdSearch, MdClear } from "react-icons/md";
import styles from "./Search.module.css";

type SearchItem = {
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
};
const Search: FC<SearchItem> = ({ search, setSearch }) => {
	return (
		<div className={styles.wrapper}>
			<MdSearch className={styles.searchIcon} />
			<input
				className={styles.input}
				type="text"
				placeholder="search"
				value={search}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearch(e.target.value)
				}
			/>
			{search && (
				<MdClear className={styles.clearIcon} onClick={() => setSearch("")} />
			)}
		</div>
	);
};

export default Search;
