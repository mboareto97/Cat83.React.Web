import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Text } from './Text';


export interface SideBarRootProps {
    children: ReactNode;
    className?: string;
    open: boolean;
}

function SideBarRoot(props: SideBarRootProps){

    return(
        <div className=
        {
            clsx
            (
                'flex flex-col h-full py-2 px-2 items-center gap-10 bg-white rounded-r',
                [props.open ? "w-80" : "w-24"],
                'duration-500 relative',
                props.className
            )
        }>  
            {props.children}
        </div>
    )
}

export interface SideBarIconProps {
    children: ReactNode;
}

function SideBarIcon({children}: SideBarIconProps){
    return(
        <Slot className=''>
            {children}
        </Slot>
    )
}


export interface SideBarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
}

function SideBarButton(props: SideBarButtonProps) {
    return(
        <Button.Root {...props}>
            <Button.Action>
                {props.children}
            </Button.Action>            
        </Button.Root>
    )
}

export interface SideBarItemProps extends SideBarRootProps{
    childrenIcon: ReactNode;
    children: ReactNode;
    path: string;
}

function SideBarItem(props: SideBarItemProps){
    const navigate = useNavigate();

    return(
        <div className=
        {
            clsx
            (
                'flex w-full h-12 py-2 px-2 items-center cursor-pointer rounded text-gray-300 hover:text-blue-900 hover:bg-gray-100',
                [!props.open ? 'justify-center' : 'justify-start gap-2']
            )
        } onClick={() => navigate(props.path)}>
            <div className='flex items-center'>
                <Slot className='w-7 h-7'>
                    {props.childrenIcon}
                </Slot>
            </div>
            <div>
                <Text asChild className=
                {
                    clsx
                    (
                        'font-semibold',
                        [!props.open && 'hidden']
                    )
                }>
                    {props.children}
                </Text>
            </div>
        </div>
    )
}

export const SideBar = {
    Root: SideBarRoot,
    Icon: SideBarIcon,
    Button: SideBarButton,
    Item: SideBarItem
}
