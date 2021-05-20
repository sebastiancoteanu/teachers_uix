import React, { FC, useState } from 'react';
import styled from "styled-components";
import { Icons } from "app/modules/assets/fonts/icons";
import { StyledEditablePage } from "app/modules/editor/side-menu/pages/common";
import IconButton from "app/modules/ui-kit/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { createEntity } from "app/entities/page/page.reducer";
import { IRootState } from "app/shared/reducers";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
`;

const CreateButton = styled(IconButton)`
  color: ${({theme}) => theme.colors.darkestGray};
  background: ${({theme}) => theme.colors.lightGray};
  font-size: 10px;
  width: 30px;
  
  &:hover {
    color: ${({theme}) => theme.colors.lightestGray};
  }
`;

const NewPage: FC = () => {
  const [url, setUrl] = useState('');
  const { entity } = useSelector<IRootState, IRootState['appUser']>(state => state.appUser);
  const dispatch = useDispatch();

  const handleOnChange = (_, value) => {
    setUrl(value);
  };

  const handleCreatePage = () => {
    dispatch(createEntity({ url, websiteId: entity.websiteId, isRestricted: false }));
    setUrl('');
  }

  return (
    <Wrapper>
      <StyledEditablePage onChange={handleOnChange} value={url} placeholder="Page URL" />
      <CreateButton name={Icons.Plus} onClick={handleCreatePage} />
    </Wrapper>
  )
};

export default NewPage;