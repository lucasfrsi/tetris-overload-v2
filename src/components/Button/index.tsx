import PropTypes from 'prop-types';
import { StyledButton } from './style';
import { useSFX, SFX } from '@/hooks/useSFX';

interface ButtonProps {
  name: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ name, onClick, disabled }: ButtonProps) => {
  const {
    actions: { playSFX },
  } = useSFX();

  const onClickHandler = () => {
    onClick();
    playSFX(SFX.BUTTON_SELECT);
  };

  return (
    <StyledButton
      type="button"
      disabled={disabled}
      onClick={onClickHandler}
      onMouseEnter={() => {
        playSFX(SFX.BUTTON_HOVER);
      }}
      tabIndex={-1}
    >
      {name}
    </StyledButton>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};
