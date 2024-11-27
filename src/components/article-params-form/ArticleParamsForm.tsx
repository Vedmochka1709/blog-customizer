import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Text } from 'src/ui/text/Text';
import { Select } from 'src/ui/select/Select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type TArticleParamsProps = {
	articleState: ArticleStateType;
	onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onChange,
}: TArticleParamsProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);

	const formRef = useRef<HTMLDivElement>(null);

	const toggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			toggle();
		}
	};

	const handleEscape = (e: KeyboardEvent) => {
		e.key == 'Escape' && toggle();
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		if (isMenuOpen == true) {
			document.addEventListener('keydown', handleEscape);
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleChangeFormState = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState({ ...formState, [key]: option });
	};

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(formState);
	};

	const handleResetForm = () => {
		setFormState(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggle} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : null
				}`}
				onSubmit={handleSubmitForm}
				onReset={handleResetForm}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>
						{' '}
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							handleChangeFormState('fontFamilyOption', option)
						}
					/>

					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							handleChangeFormState('fontSizeOption', option)
						}
					/>

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => handleChangeFormState('fontColor', option)}
					/>

					<Separator></Separator>

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							handleChangeFormState('backgroundColor', option)
						}
					/>

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleChangeFormState('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
