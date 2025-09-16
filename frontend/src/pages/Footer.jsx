import { Heart, Code, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
    ];



    return (
        <footer className=" bottom-0 left-0 w-full bg-gray-800 text-white  ">
            {/* Main Footer Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand/Logo Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Elaview</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-sm">
                            A modern web application built with the MERN stack.
                            Exploring the possibilities of full-stack development.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-blue-400 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/*Links */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                            Connect
                        </h4>

                        <div className="space-y-3">
                            <a
                                href="https://github.com/farazNaqvi729927"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                                aria-label="Visit GitHub profile"
                            >
                                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                    <Github className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                        GitHub
                                    </span>
                                    <p className="text-xs text-gray-500">View my repositories</p>
                                </div>
                                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/faraz-naqvi-a4731b274/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                                aria-label="Visit LinkedIn profile"
                            >
                                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                    <Linkedin className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                        LinkedIn
                                    </span>
                                    <p className="text-xs text-gray-500">Professional network</p>
                                </div>
                                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                            </a>
                        </div>
                    </div>


                      {/* Social Links & Tech Stack */}
                    <div className="md:col-span-1">
                        <div className="text-xs text-gray-500">
                            <p className="mb-1">Built with</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-800 px-2 py-1 rounded text-green-400">MongoDB</span>
                                <span className="bg-gray-800 px-2 py-1 rounded text-yellow-400">Express</span>
                                <span className="bg-gray-800 px-2 py-1 rounded text-blue-400">React</span>
                                <span className="bg-gray-800 px-2 py-1 rounded text-green-500">Node.js</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-center space-y-2">
                        {/* Copyright */}
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                            <span>© {currentYear} Elaview</span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                                <span>All Rights Reserved</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>


        </footer>
    );
}