import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./button";
import {
	LogOut,
	Settings,
	User,
	X,
	MessageSquare,
	History,
	Home,
	Info,
	Menu,
	Sparkles,
} from "lucide-react";
import FormaiLogo from "../../assets/Formai.svg";
import { useAuth } from "../../hooks/useAuth";

type NavItem = {
	name: string;
	href: string;
	isRouterLink: boolean;
	icon: JSX.Element;
	onClick?: () => void;
	variant?: "default" | "primary" | "danger";
};

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, logout } = useAuth();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const handleScroll = () => {
		const offset = window.scrollY;
		setIsScrolled(offset > 20);
	};

	const handleResize = () => {
		setIsMobile(window.innerWidth < 768);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleLogout = () => {
		logout(() => {
			setShowLogoutConfirm(false);
			navigate("/");
		});
	};

	const navItems: NavItem[] = isAuthenticated
		? [
				{
					name: "Chat",
					href: "/dashboard",
					isRouterLink: true,
					icon: <MessageSquare className="w-4 h-4" />,
				},
				{
					name: "History",
					href: "/history",
					isRouterLink: true,
					icon: <History className="w-4 h-4" />,
				},
				{
					name: "Settings",
					href: "/account-settings",
					isRouterLink: true,
					icon: <Settings className="w-4 h-4" />,
				},
				{
					name: "Logout",
					href: "#",
					isRouterLink: false,
					onClick: () => setShowLogoutConfirm(true),
					icon: <LogOut className="w-4 h-4" />,
					variant: "danger",
				},
		  ]
		: [
				{
					name: "Home",
					href: "/",
					isRouterLink: true,
					icon: <Home className="w-4 h-4" />,
				},
				{
					name: "About",
					href: "/about",
					isRouterLink: true,
					icon: <Info className="w-4 h-4" />,
				},
				{
					name: "Sign In",
					href: "/signin",
					isRouterLink: true,
					icon: <User className="w-4 h-4" />,
				},
				{
					name: "Get Started",
					href: "/signup",
					isRouterLink: true,
					icon: <Sparkles className="w-4 h-4" />,
					variant: "primary",
				},
		  ];

	return (
		<>
			<div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
				<nav
					style={{
						maxWidth: isScrolled ? (isMobile ? '160px' : '650px') : '900px',
						transition: 'max-width 500ms cubic-bezier(0.4, 0, 0.2, 1), background-color 500ms, backdrop-filter 500ms, box-shadow 500ms'
					}}
					className={`
            pointer-events-auto
            flex items-center justify-between
            bg-background/80 backdrop-blur-2xl
            border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.12)]
            rounded-full
						px-4 py-2 md:px-6 md:py-3
						w-full
						${isScrolled
							? "bg-background/90 backdrop-blur-3xl shadow-xl"
							: "bg-background/60"}
					`}>
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2 group mr-2 sm:mr-4 shrink-0">
						<div className={`relative w-8 h-8 items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all duration-500 hidden md:flex`}>
							<img
								src={FormaiLogo}
								alt="Formai"
								className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
							/>
						</div>
						<span className={`font-heading font-semibold text-lg tracking-tight transition-all duration-500 block`}>
							Formai
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center gap-1 flex-shrink-0">
						{navItems.map((item) => {
							const isActive = location.pathname === item.href;
							
							if (item.variant === "primary") {
								return (
									<Link
										key={item.name}
										to={item.href}
										className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/25 whitespace-nowrap">
										{item.name}
										{item.icon}
									</Link>
								);
							}

							const content = (
								<>
									{item.icon}
									<span>{item.name}</span>
								</>
							);

							const className = `
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${isActive 
                  ? "bg-white/10 text-white shadow-inner" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"}
                ${item.variant === "danger" ? "hover:text-red-400 hover:bg-red-500/10" : ""}
              `;

							return item.isRouterLink ? (
								<Link key={item.name} to={item.href} className={className}>
									{content}
								</Link>
							) : (
								<button key={item.name} onClick={item.onClick} className={className}>
									{content}
								</button>
							);
						})}
					</div>

					{/* Mobile Menu Toggle */}
					<button
						className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
						onClick={() => setIsMobileMenuOpen(true)}>
						<Menu className="w-6 h-6" />
					</button>
				</nav>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl transition-all duration-500 md:hidden ${
					isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsMobileMenuOpen(false)}>
				
				{/* Full-screen mobile menu */}
				<div
					className={`h-full w-full flex flex-col transform transition-all duration-500 ${
						isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
					}`}
					onClick={(e) => e.stopPropagation()}>
					
					{/* Header */}
					<div className="flex justify-between items-center p-6 border-b border-white/5">
						<span className="font-heading font-semibold text-2xl text-white">Formai</span>
						<button
							onClick={() => setIsMobileMenuOpen(false)}
							className="p-3 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all active:scale-95">
							<X className="w-6 h-6" />
						</button>
					</div>

					{/* Navigation Items */}
					<div className="flex-1 flex flex-col justify-center px-6 py-8">
						<div className="flex flex-col gap-2">
							{navItems.filter(item => item.variant !== "primary").map((item, index) => {
								const isActive = location.pathname === item.href;
								const baseClassName = `
									flex items-center gap-4 p-5 rounded-2xl transition-all text-lg font-medium
									${isActive 
										? "bg-white/10 text-white" 
										: "text-white/60 hover:bg-white/5 hover:text-white active:scale-[0.98]"}
									${item.variant === "danger" ? "text-red-400/80 hover:text-red-400 hover:bg-red-500/10" : ""}
								`;

								const content = (
									<>
										<div className={`p-2 rounded-xl ${isActive ? "bg-white/10" : "bg-white/5"}`}>
											{item.icon}
										</div>
										<span>{item.name}</span>
									</>
								);

								if (item.isRouterLink) {
									return (
										<Link
											key={item.name}
											to={item.href}
											className={baseClassName}
											style={{ animationDelay: `${index * 50}ms` }}
											onClick={() => setIsMobileMenuOpen(false)}>
											{content}
										</Link>
									);
								}

								return (
									<button
										key={item.name}
										onClick={() => {
											item.onClick?.();
											setIsMobileMenuOpen(false);
										}}
										className={baseClassName}
										style={{ animationDelay: `${index * 50}ms` }}>
										{content}
									</button>
								);
							})}
						</div>
					</div>

					{/* CTA Button at Bottom */}
					{navItems.filter(item => item.variant === "primary").map((item) => (
						<div key={item.name} className="p-6 border-t border-white/5">
							<Link
								to={item.href}
								className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-white text-black font-semibold text-lg hover:bg-neutral-100 transition-all active:scale-[0.98] shadow-xl shadow-white/10"
								onClick={() => setIsMobileMenuOpen(false)}>
								{item.icon}
								<span>{item.name}</span>
							</Link>
						</div>
					))}
				</div>
			</div>

			{/* Logout Confirmation */}
			{showLogoutConfirm && (
				<div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
					<div className="bg-card border border-border w-full max-w-sm p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
						<h3 className="text-xl font-heading font-semibold mb-2">Log out?</h3>
						<p className="text-muted-foreground mb-6">
							Are you sure you want to sign out of your account?
						</p>
						<div className="flex justify-end gap-3">
							<Button variant="ghost" onClick={() => setShowLogoutConfirm(false)}>
								Cancel
							</Button>
							<Button variant="destructive" onClick={handleLogout}>
								Log out
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
