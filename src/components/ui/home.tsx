import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { logoutAndRedirect } from "@/auth/authHelper";
import { useDocumentTitle } from "@/utils/useDocumentTitle";

const Home = () => {
	const navigate = useNavigate();
	const { isAuthenticated, loading } = useAuth();
	useDocumentTitle("Formai - AI Form Generation");

	useEffect(() => {
		if (loading) return;
		if (isAuthenticated) {
			const nonPersistent = localStorage.getItem("nonPersistentAuth") === "true";
			if (nonPersistent) {
				(async () => {
					await logoutAndRedirect(null);
				})();
			} else {
				navigate("/dashboard", { replace: true });
			}
		}
	}, [isAuthenticated, loading, navigate]);

	return (
		<div className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-white/20">
			{/* Hero Section */}
			<section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
				{/* Background Image - Responsive */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute inset-0 bg-black/40 z-10"></div> {/* Overlay for text readability */}
					{/* Mobile background */}
					<img 
						src="/gradient-phone.png"
						alt="Background" 
						className="w-full h-full object-cover opacity-80 md:hidden"
					/>
					{/* Desktop background */}
					<img 
						src="/gradient-desktop.jpeg"
						alt="Background" 
						className="w-full h-full object-cover opacity-80 hidden md:block"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-20"></div>
				</div>

				<div className="relative z-30 max-w-5xl mx-auto space-y-8 mt-10">
					<h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-heading font-normal tracking-tight leading-[1.1] text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 drop-shadow-2xl">
						AI that feels <span className="italic">human.</span><br />
						Builds forms in seconds.
					</h1>
					
					<p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 font-light">
						Handle millions of responses with a platform built for complexity, designed for simplicity.
					</p>
					
					<div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 pt-8">
						<Button
							size="lg"
							className="rounded-full px-10 py-7 text-lg bg-white text-black hover:bg-white/90 shadow-xl transition-transform hover:scale-105 active:scale-95 min-w-[200px]"
							onClick={() => navigate("/signup")}>
							Get Started
						</Button>
					</div>
				</div>
				
				{/* Floating Concept UI at bottom of hero */}
				<div className="relative z-30 mt-20 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
					<div className="glass-panel p-1 rounded-2xl border-white/10 bg-black/40 backdrop-blur-xl">
						<div className="bg-black/50 rounded-xl p-6 border border-white/5 flex items-center gap-4">
							<div className="w-3 h-3 rounded-full bg-red-500"></div>
							<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
							<div className="w-3 h-3 rounded-full bg-green-500"></div>
							<div className="ml-4 h-2 w-32 bg-white/10 rounded-full"></div>
						</div>
						<div className="h-40 md:h-64 flex items-center justify-center">
							<span className="text-white/20 font-heading italic text-2xl">Interactive Demo Interface</span>
						</div>
					</div>
				</div>
			</section>



			{/* Bento Grid Features */}
			<section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="max-w-7xl mx-auto">
					<div className="mb-20 text-center">
						<h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Designed for Speed</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Experience the next generation of form building. Intelligent, intuitive, and incredibly fast.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
						{/* Large Card */}
						<div className="md:col-span-2 row-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group border-white/5 hover:border-white/20 transition-colors duration-500">
							<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500"></div>
							<div className="relative z-10 h-full flex flex-col justify-between">
								<div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl w-fit border border-white/10">
									<Zap className="w-8 h-8 text-white" />
								</div>
								<div>
									<h3 className="text-3xl font-heading font-semibold mb-4">Instant Generation</h3>
									<p className="text-muted-foreground text-lg leading-relaxed max-w-md">
										Type "Create a customer satisfaction survey for a coffee shop" and watch as Formai generates questions, logic, and style instantly.
									</p>
								</div>
							</div>
						</div>

						{/* Small Card 1 */}
						<div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-white/30 transition-colors duration-300">
							<div className="relative z-10 h-full flex flex-col justify-between">
								<Shield className="w-8 h-8 text-neutral-300" />
								<div>
									<h3 className="text-xl font-heading font-semibold mb-2">Enterprise Security</h3>
									<p className="text-muted-foreground">Built on Google's secure infrastructure.</p>
								</div>
							</div>
						</div>

						{/* Small Card 2 */}
						<div className="glass-panel rounded-3xl p-8 relative overflow-hidden group hover:border-white/30 transition-colors duration-300">
							<div className="relative z-10 h-full flex flex-col justify-between">
								<Globe className="w-8 h-8 text-neutral-400" />
								<div>
									<h3 className="text-xl font-heading font-semibold mb-2">Global Reach</h3>
									<p className="text-muted-foreground">Auto-translation into 30+ languages.</p>
								</div>
							</div>
						</div>

						{/* Wide Card */}
						<div className="md:col-span-3 glass-panel rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-white/20 transition-colors">
							<div className="text-left max-w-xl">
								<h3 className="text-3xl font-heading font-semibold mb-4">Seamless Integration</h3>
								<p className="text-muted-foreground text-lg">
									Works directly with your existing Google Workspace. No new accounts to manage, just pure productivity.
								</p>
							</div>
							<div className="flex-shrink-0 p-6 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
								<div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
									<span className="text-white">✓</span> Connected to Google Drive
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Minimal CTA */}
			<section className="py-32 px-4 text-center relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 pointer-events-none"></div>
				<div className="relative z-10 max-w-3xl mx-auto space-y-8">
					<h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
						Ready to build?
					</h2>
					<p className="text-xl text-muted-foreground">
						Join the waitlist and experience the future of forms.
					</p>
					<Button
						size="lg"
						className="rounded-full px-10 py-8 text-xl bg-white text-black hover:bg-neutral-200 shadow-2xl shadow-white/10 transition-all hover:scale-105"
						onClick={() => navigate("/signup")}>
						Get Started Now
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Home;
