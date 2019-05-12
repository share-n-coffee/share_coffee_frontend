import React, {useState} from 'react';
import styles from './styles.module.scss';
import List from './List';
import { ReactComponent as DropdownArrowIcon } from '../../icons/DropdownArrow.svg'

let timeOutId = null;

const getLabelByValue = (options, value) => {
    const option = (options || []).find(option => option.value === value);

    return option.label;
};

const Dropdown = ({options, selectedValue, onSelect}) => {
    const [isOpened, setIsOpened] = useState(false);
    const selection = selectedValue ? getLabelByValue(options, selectedValue) : 'Accounts';

    return (
        <div
            onFocus={() => clearTimeout(timeOutId)}
            onBlur={() => {
                timeOutId = setTimeout(() => {
                    setIsOpened(false);
                });
            }}
            className={`${styles.dropdown_container} ${isOpened ? styles['focused'] : undefined}`}
        >
            <div tabIndex="0" className={styles.selection}  onClick={() => setIsOpened(!isOpened)}>
                {selection}
                <DropdownArrowIcon className={`${styles.arrow} ${isOpened ? styles['rotated'] : undefined}`}/>
            </div>
            {isOpened && <List onItemClick={value => {
                onSelect(value);
                setIsOpened(false);
            }} options={options}/>}
        </div>
    )
};

export default Dropdown;