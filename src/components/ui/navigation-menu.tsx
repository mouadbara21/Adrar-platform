import React from 'react';

interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationMenuListProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationMenuItemProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

const NavigationMenuContext = React.createContext<{
  openItem: string | null;
  setOpenItem: (item: string | null) => void;
}>({
  openItem: null,
  setOpenItem: () => {},
});

const NavigationMenu: React.FC<NavigationMenuProps> = ({ children, className = '' }) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <NavigationMenuContext.Provider value={{ openItem, setOpenItem }}>
      <nav className={`relative z-10 flex max-w-max flex-1 items-center justify-center ${className}`}>
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
};

const NavigationMenuList: React.FC<NavigationMenuListProps> = ({ children, className = '' }) => {
  return (
    <div className={`group flex flex-1 list-none items-center justify-center space-x-1 ${className}`}>
      {children}
    </div>
  );
};

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ children, className = '' }) => {
  const itemId = React.useId();
  
  return (
    <div className={`relative ${className}`} data-item-id={itemId}>
      {children}
    </div>
  );
};

const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({ children, className = '' }) => {
  const { openItem, setOpenItem } = React.useContext(NavigationMenuContext);
  const itemElement = React.useRef<HTMLButtonElement>(null);
  const itemId = itemElement.current?.closest('[data-item-id]')?.getAttribute('data-item-id');
  const isOpen = openItem === itemId;

  const handleClick = () => {
    setOpenItem(isOpen ? null : itemId || null);
  };

  return (
    <button
      ref={itemElement}
      className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({ children, className = '' }) => {
  const { openItem } = React.useContext(NavigationMenuContext);
  const itemElement = React.useRef<HTMLDivElement>(null);
  const itemId = itemElement.current?.closest('[data-item-id]')?.getAttribute('data-item-id');
  const isOpen = openItem === itemId;

  if (!isOpen) return null;

  return (
    <div
      ref={itemElement}
      className={`absolute left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ${className}`}
    >
      {children}
    </div>
  );
};

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
};