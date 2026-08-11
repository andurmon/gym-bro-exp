import styled from '@emotion/styled';
import {
    Box as MuiBox,
    ListItemButton as MuiListItemButton,
    ListItemIcon as MuiListItemIcon, 
    Toolbar as MuiToolbar,
    Typography as MuiTypography,
} from "@mui/material";

export const DrawerBox = styled(MuiBox)`
    height: 100%;
    color: var(--text);
    background-color: var(--code-bg);

`;

export const Toolbar = styled(MuiToolbar)`
    min-height: 72px !important;
    px: 2.5;
`;

export const Typography = styled(MuiTypography)`
    color: var(--text);
    font-weight: 700;
    letter-spacing: -0.5px;
`;

export const BoxPrimary = styled(MuiBox)`
    color: var(--primary);
`;

export const LayoutListItemButton = styled(MuiListItemButton)`
    border-radius: 2;
    mb: 0.5;
    color: ${(props) => props.active === "true" ? 'var(--text)' : 'var(--secondary)'};
    background-color: ${(props) => props.active === "true" ? 'var(--accent-bg)' : 'transparent'};
    &:hover {
        background-color: var(--accent-bg);
        color: var(--text);
    }
`;

export const LayoutListItemIcon = styled(MuiListItemIcon)`
    min-width: 42;
    color: ${(props) => props.active === "true" ? 'var(--primary)' : 'var(--secondary)'};                                  
`;