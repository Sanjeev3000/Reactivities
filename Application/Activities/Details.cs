using Domain;
using System;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Application.Errors;
using System.Net;
using Microsoft.Extensions.Logging;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Query(Guid id)
            {
                Id = id;
            }
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            private readonly ILogger<Handler> _logger;

            public Handler(DataContext context, ILogger<Handler> logger)
            {
                this._logger = logger;
                this._context = context;

            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.Id);
                //  _logger.LogInformation(activity.Date.ToString());
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found" });


                return activity;
            }
        }
    }
}